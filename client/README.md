# Set Up

npm i axios fetch

# Code Review

best use of global context was through auth state
(jwt with the cookie) between
multiple components

CSS is global-resolve through namespacing or through scope

Could have address loggedIn state through localStorage instead of using an endpoint to verify login status on backend but with http-only cookie that is the only way since front end code cant access http only cookie

loggedIn was useful for global state because it helped
with conditional rendering

useState hook updates state on next rerender of component, not immediately...to resolve use arrow function inside of usestate hook
