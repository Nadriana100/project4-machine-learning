# project4-machine-learning

The goal of this project was to build a machine learning model to predict house prices and deploy it to an [online app](https://house-price-predictor-gt.herokuapp.com). We used a dataset from 
[Kaggle](https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques/data) which includes 79 features of homes in Ames, Iowa.

We used ridge linear regression as well as a random forest classifier. To make the app easily manageable for users, we settled with a random forest regressor
that only takes in 6 features. Despite being simplified, the model still achieves an r-squared value of over 0.8 and predicts reasonably well given features that 
someone in the market will typically have in mind.
