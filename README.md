## Hank Hester's react-native-challenge submission

👋 Hi! Here's my submission :)

In the interest of not using external libraries and keeping code here simple,
I used the plain `StyleSheet.create` for styling,
although I've used both styled-components and tailwindcss via tailwind-rn (my personal favorite) in the past.

How to do state management in react is always an interesting choice,
here I chose to just keep a single `AppState` to track progression through fetching an affirmation.
Note that since I'm working in typescript, we get compiler checks and can't pass just any string to `setAppState`.
I could have used a typescript enum for this? But the type-checked string comparison feels natural to me.
If this were integrated into a larger app the way this state is tracked (or at least the name `AppState`) would be different.

If I were to continue working on this I'd add an animation to this modal as well,
and might use an svg instead of an image for the "x" button to close the modal.

Tested on both ios and android.

Let me know if you have any questions!

\- Hank

Screenshots from the app running on an iphone:
<img width="823" alt="image" src="https://user-images.githubusercontent.com/19683507/122145275-cb8d6180-ce09-11eb-8eac-7093adc0692a.png">
