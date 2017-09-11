# Fruit-Platter
This is a basic skill designed to tell understand the device it is being used on and display content appropirately. If being used on a normal echo, dot, whatever without a screen, it sends back usual responses. If used on an echo show (ie. a screen with a device), it creates a response using a body template, responses specific for devices with screens. 

Display Interface Documentation: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference

Video Tutorial Here: https://youtu.be/nqyeuga2KF8

# Full Written Walkthrough:
* Create a new skill in the Amazon Developer Portal; call it Fruit Platter and make the invocation name 'fruit platter'
* Select 'Custom Interaction Model'
* Enable 'Render Template' under Global Fields
* Create a new lambda function in your AWS account, and copy the ARN under configuration in the Amazon Dev Portal
* Copy intentschema.js contents into interaction model
* Create custom slot type using customslottypes.js
* Copy sample utterances from sampleutterances.js
* Replace fact example code in lambda function with contents of index.js
* ???
* Profit
