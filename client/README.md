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

useState hook updates state on next rerender of component, not immediately...to resolve use arrow function inside of set function to
get previous state
useState is asynchronous

the reason why i needed category context was because i was rendering one of the
same two components but i was passing state into one of the two components that
wouldnt get rendered...i NEEDED context to resolve this

# Minor Fixes
save active state to localstorage so on refresh user doesnt back
out of category they are in
