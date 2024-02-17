// function findClosestPoint(x, y, points) {
//     if (points.length === 0) {
//         return null; // Return null if the array is empty
//     }
//
//     let closestPoint = points[0]; // Initialize closestPoint with the first point in the array
//     let closestDistance = distance(x, y, closestPoint.x, closestPoint.y);
//
//     for (let i = 1; i < points.length; i++) {
//         const currentPoint = points[i];
//         const currentDistance = distance(x, y, currentPoint.x, currentPoint.y);
//
//         if (currentDistance < closestDistance) {
//             closestPoint = currentPoint;
//             closestDistance = currentDistance;
//         }
//     }
//
//     return { name: closestPoint.name, point: closestPoint, distance: closestDistance };
// }
//
// function distance(x1, y1, x2, y2) {
//     // Calculate Euclidean distance between two points
//     return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
// }
//
// var points = [
//     { name: 'Bug 1', x: 22, y: 85 },
//     { name: 'Bug 2', x: 80, y: 7 },
//     { name: 'Bug 3', x: 2, y: 15 },
//     { name: 'Bug 4', x: 45, y: 30 },
//     { name: 'Bug 5', x: 85, y: 2 },
//     { name: 'Bug 6', x: 37, y: 99 },
//     { name: 'Bug 7', x: 96, y: 31 },
// ]
//
// // start a timer
// var startTime = new Date().getTime();
//
// // wait for 5 seconds
// setTimeout(function() {
//     // count down from 3
//     document.getElementById('pre-game-info').innerHTML = '3';
//     setTimeout(function() {
//         document.getElementById('pre-game-info').innerHTML = '2';
//         setTimeout(function() {
//             document.getElementById('pre-game-info').innerHTML = '1';
//             setTimeout(function() {
//                 document.getElementById('pre-game-info').innerHTML = 'GO!';
//                 setTimeout(function() {
//                     document.getElementById('pre-game-info').style.display = 'none';
//                     document.getElementById('find-the-bug').style.display = 'block';
//                 }, 1000);
//             }, 1000);
//         }, 1000);
//     }, 1000);
// }, 5000);
//
// const image = document.getElementById('find-the-bug');
//
//         // Add a click event listener to the image
//         image.addEventListener('click', function(event) {
//             // Get the X and Y coordinates of the click relative to the image
//             const x = event.clientX - image.getBoundingClientRect().left;
//             const y = event.clientY - image.getBoundingClientRect().top;
//
//             // Get the dimensions of the image
//             const imageWidth = image.clientWidth;
//             const imageHeight = image.clientHeight;
//
//             // Calculate the percentage coordinates
//             const percentageX = (x / imageWidth) * 100;
//             const percentageY = (y / imageHeight) * 100;
//
//             // Log the percentage coordinates
//             console.log(`Clicked at ${percentageX}% x and ${percentageY}% y`);
//
//             // Find the closest point
//             const closestPoint = findClosestPoint(percentageX, percentageY, points);
//             // log the closest point name and distance
//             console.log(`Closest point is ${closestPoint.name} at ${closestPoint.distance}% distance`);
//             if (closestPoint.distance < 3) {
//
//                 if (points.length === 1) {
//                     victory.play();
//                     // calculate time elapsed
//                     const timeElapsed = new Date().getTime() - startTime;
//                     // calculate seconds (round to nearest tenth of a second)
//                     const seconds = Math.round(timeElapsed / 100) / 10;
//                     // hide the image
//                     image.style.display = 'none';
//                     // show the victory message
//                     document.getElementById('victory-text').innerHTML = `You found all the bugs in ${seconds} seconds!`;
//                     document.getElementById('victory-text').style.display = 'block';
//                 }
//                 else{
//                     success.currentTime = 0;
//                     success.play();
//                 }
//                 // remove the point from the array
//                 points.splice(points.indexOf(closestPoint.point), 1);
//
//             }
//
//         });

