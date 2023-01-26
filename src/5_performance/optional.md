### Optional

Even though computing outside the render with `useEffect` led to an acceptable outcome, there's still only a single thread of operation in the browser, meaning while the computation takes place (outside the component render), other activities in our application may still become affected (such as interactions and animations).

There really is a need for a separate thread for expensive computations, and the browser environment does support it, via [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).

[Here](https://www.smashingmagazine.com/2020/10/tasks-react-app-web-workers/) is a great article describing how to add web workers to a React application; peruse it and think about how you'd add a web worker to this example to compute the mode effectively.
