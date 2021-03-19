# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Overview

This is my second challenge in the "Frontend Mentor" site. The first one being the interactive pricing component challenge.

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list


### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)


### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox

### What I learned

I have learnt how to use js drag events to create drag and drop lists. This was my first encounter with drag events.

On css front i have learnt how to use pointer events none so that js click event doesnt fire on click of any particular item... here i had a div with checkbtn class and inside that an image. But on clicking the checkbtn the img got clicked...so to disable this i have set its pointer events to none.  
```css
img{
  pointer-events: none;
}
```

here are some javascript codes which was neccesary for drag and drop list
```js

```below function calculates the distance in px between each lists and the position where the dragging list is dropped```

function distanceBetweenItemPositionAndDroppedPosition(item, droppedPosition) {
    const rect = item.getBoundingClientRect();
    return (droppedPosition - (rect.top + rect.height / 2));
}

```below code calls the distanceBetweenItemPositionAndDroppedPosition() for each list item and the dropped position to get which element is the nearest to the dropped position(i.e to get the element just below the dragged position so we can run insertBefore function of js to place this list item on the container before the below element ) ```
container.addEventListener('drop', (e) => {
        e.preventDefault();
        // console.log("items has been dropped")
        const newDraggables = Array.from(document.querySelectorAll('.listItem:not(.dragging'));
        positionObj = { offset: Number.NEGATIVE_INFINITY }
        newDraggables.forEach(item => {
            let offset = distanceBetweenItemPositionAndDroppedPosition(item, e.clientY);
            if (offset < 0 && offset > positionObj.offset) {
                positionObj.offset = offset;
                positionObj.element = item;
            }
        })
        const dragging = document.querySelector('.dragging');
        container.insertBefore(dragging, positionObj.element)
        console.log(positionObj.element);
    })


```also got to know about img.src.match() which matches the src to the given src because we cant use something like this: img.src==="images/somepic.jpg"
because img.src return something like this: http://yoursitename/images/somepic.jpg which is certainly not equal to "images/somepic.jpg" so match() just matches the regular expression for you and return true or false ```


- [web dev simplified video on drag and drop functionality](https://www.youtube.com/watch?v=jfYWwQrtzzY) - This helped me to get done with drag and drop functionality.



## Author

- Frontend Mentor - [@vishalsingh6350](https://www.frontendmentor.io/profile/vishalsingh6350)
