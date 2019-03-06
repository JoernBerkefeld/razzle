# Razzle AWS Lambda Example

- [Razzle AWS Lambda Example](#razzle-aws-lambda-example)
  - [Getting started](#getting-started)
  - [Deploy to AWS Lambda (Production Build)](#deploy-to-aws-lambda-production-build)
  - [Setting up AWS Lambda for the first time](#setting-up-aws-lambda-for-the-first-time)
  - [Uploading Updates to AWS Lambda](#uploading-updates-to-aws-lambda)

## Getting started
1. Download the example [or clone the whole project](https://github.com/joernberkefeld/razzle.git):

```bash
curl https://codeload.github.com/jaredpalmer/razzle/tar.gz/master | tar -xz --strip=2 razzle-master/examples/with-aws-lambda
cd basic
```

2. Install it and run the debug server:

```bash
yarn install
yarn start

or 

npm install
npm start
```

## Deploy to AWS Lambda (Production Build)

1. Kill any running debug server (see above)
2. Compile a new build
```bash
npm run build
```
3. The first time and everytime you have changed dependencies in your `package.json`:
```bash
npm prune --production
```
This will remove all invalid dependencies as well as devDependencies from your `node_modules/` folder.

4. Pack both the `build/` and `node_modules/` folders into one zip file. The name of the ZIP is irrelevant.

5. re-install dev-dependencies
```bash
npm install
```

6. Now go to your AWS Lambda interface, upload the Zip file and reload the page in the browser.

**Note:** Step 3 and 5 can usually be skipped. Step 4 can usually be limited to just updating the `build/` folder in your zip file, while keeping the `node_modules` folder as is. You really just need these extra steps when you changed your dependencies or when running it for the first time!


## Setting up AWS Lambda for the first time

1. Log into your AWS Account and open the Service Lambda. Then click on `Create Function`: 
![step 01](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step01.jpg)

2. Select `Author from scratch`, fill in a name (choosing "basicTest" will make running the example easier at first), make sure to select the newest Node.js and to assign a role. Any will do for now as there are no dependencies. 
![step 02](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step02.jpg)

3. Click on `API Gateway`. 
![step 03](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step03.jpg)

4. Click on the empty dropdown menu and choose `Create a new API`. 
![step 04](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step04.jpg)

5. A new `Security` dropdown appears. Choose `Open` for now to keep it simple and hit the `Add` button. 
![step 05](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step05.jpg)

6. Confirm your changes by clicking on `Save`. 
![step 06](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step06.jpg)

7. Now click on the link text `basicTest-API` which will open a new tab with the API Gateway settings. 
![step 07](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step07.jpg)

8. On this new page, make sure that either `ANY` or `basicTest` above it is selected, not the `/` above it. Then click on the `Actions` button followed by the `Create Resource` option. 
![step 08](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step08.jpg)

9. Check the `Configure as proxy resource` checkbox which should auto-fill the below inputs as displayed. If it does not, fill in the values manually with "proxy" and "{proxy+}". Then confirm by clicking on `Create Resource`. 
![step 09](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step09.jpg)

10. A new form appears, asking you to input the name of your Lambda function. Once you start typing, it should auto-complete the rest. Hit `Save` to confirm. 
![step 10](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step10.jpg)

11. A pop-up opens, asking you to confirm granting permissions to your Lambda function. Click on `OK`. 
![step 11](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step11.jpg)

12. Now, we have fully configured the **API Gateway** and need to publish our changes. Click on the `Actions`-button and then on `Deploy API`. 
![step 12](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step12.jpg)

13. In the pop-up that appears, select `default` and click on `Deploy`. 
![step 13](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step13.jpg)

14. Switch back to the Lambda interface via the top navigation. 
![step 14](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step14.jpg)

15. Select the new function we just created by clicking on it. 
![step 15](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step15.jpg)

16. Here, the Lambda function "basicTest" should already be selected, offering you a dropdown labeled with `Code entry type`. Click on it and select `Upload a .zip file`. 
![step 16](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step16.jpg)

17. Click on the `Upload` button and select your zip file that you created locally. Also change the input in the `Handler` field to "build/server.handler". Finally, confirm by clicking on `Save`. 
![step 17](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step17.jpg)

18. Click on `API Gateway` and then on the link that is not ending on `{proxy+}`. 
![step 18](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step18.jpg)

19. A new tab opens and you first see an error message. This happens because there seems to be a minor bug somewhere in the code... (TODO). 
![step 19](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step19.jpg)

20. Instead, change the end of the URL to "/default/basicTest/" (ending on a "/") and you will finally see the output of your app.
![step 20](https://github.com/JoernBerkefeld/razzle/raw/master/examples/with-aws-lambda/readme_img/step20.jpg)


## Uploading Updates to AWS Lambda
Create your new zip file and then just follow step 16 and 17 from above to apply the update.