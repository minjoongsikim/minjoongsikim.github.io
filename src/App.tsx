"use client";
import { useEffect, useRef, useState } from "react";
import gif from "./assets/cae.gif";
import def from "./cae-assets/11.jpg";
import cae1 from "./cae-assets/cae1.jpg";
import cae2 from "./cae-assets/cae2.jpg";
import cae3 from "./cae-assets/cae3.png";
import cae5 from "./cae-assets/cae5.png";
import cae6 from "./cae-assets/cae6.gif";
import cae7 from "./cae-assets/cae7.jpg";
import cae8 from "./cae-assets/cae8.jpg";
import caeandme from "./cae-assets/caeandme.jpg";
import dinko from "./cae-assets/dinko.jpg";
import cae11 from "./cae-assets/cae2.gif";
import cae12 from "./cae-assets/12.jpg";
import cae13 from "./cae-assets/13.jpg";
import cae14 from "./cae-assets/14.jpg";
import cae15 from "./cae-assets/15.jpg";
import cae16 from "./cae-assets/16.jpg";
import cae17 from "./cae-assets/17.jpg";
import cae18 from "./cae-assets/18.jpg";
import flowers from "./cae-assets/pp.png";

const images = [
     cae1, cae2, cae3, cae5, cae6, cae7, cae8, caeandme, dinko, cae11, cae12, cae13, cae14, cae15, cae16, cae17, cae18,
];

export default function Page() {
     const [noCount, setNoCount] = useState(0);
     const [yesPressed, setYesPressed] = useState(false);
     const [noButtonPos, setNoButtonPos] = useState({ x: 800, y: 523 });
     const yesButtonSize = noCount * 20 + 16;
     const gifWidth = 150;
     const gifHeight = 200;

     const numImages = images.length;
     const [imagePositions, setImagePositions] = useState<{ x: number; y: number }[]>([]);
     const [imageVelocities, setImageVelocities] = useState<{ x: number; y: number }[]>([]);
     const imageRefs = useRef(Array(numImages).fill(null));
     const [imageHeights, setImageHeights] = useState(Array(numImages).fill(0));

     useEffect(() => {
          const initImagePositions = () => {
               const newPositions = [];
               const newVelocities = [];
               for (let i = 0; i < numImages; i++) {
                    const maxX = window.innerWidth - gifWidth;
                    const maxY = window.innerHeight - gifHeight;
                    newPositions.push({
                         x: Math.random() * maxX,
                         y: Math.random() * maxY,
                    });
                    newVelocities.push({
                         x: (Math.random() - 0.5) * 8,
                         y: (Math.random() - 0.5) * 8,
                    });
               }
               setImagePositions(newPositions);
               setImageVelocities(newVelocities);
          };
          initImagePositions();
     }, [numImages]);

     useEffect(() => {
          const handleImageLoad = (index: number) => () => {
               const newHeights = [...imageHeights];
               newHeights[index] = imageRefs.current[index].clientHeight;
               setImageHeights(newHeights);
          };

          const currentImageRefs = imageRefs.current;

          images.forEach((_, index) => {
               if (currentImageRefs[index]) {
                    currentImageRefs[index].addEventListener("load", handleImageLoad(index));
               }
          });

          return () => {
               images.forEach((_, index) => {
                    if (currentImageRefs[index]) {
                         currentImageRefs[index].removeEventListener("load", handleImageLoad(index));
                    }
               });
          };
     }, [imageHeights]);

     useEffect(() => {
          const animate = () => {
               const newPositions = imagePositions.map((pos, index) => {
                    const newX = pos.x + imageVelocities[index].x;
                    const newY = pos.y + imageVelocities[index].y;

                    // Bounce off edges
                    if (newX < 0 || newX > window.innerWidth - gifWidth) {
                         imageVelocities[index].x *= -1;
                    }
                    if (newY < 0 || newY + imageHeights[index] > window.innerHeight) {
                         imageVelocities[index].y *= -1;
                    }

                    return { x: newX, y: newY };
               });
               setImagePositions(newPositions);
               requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          return () => cancelAnimationFrame(requestAnimationFrame(animate));
     }, [imagePositions, imageVelocities, imageHeights]);

     const getRandomPosition = () => {
          const maxX = window.innerWidth - 100; // Adjust 100 for button width
          const maxY = window.innerHeight - 50; // Adjust 50 for button height
          return {
               x: Math.random() * maxX,
               y: Math.random() * maxY,
          };
     };

     const handleNoClick = () => {
          setNoCount(noCount + 1);
     };

     const handleNoHover = () => {
          setNoButtonPos(getRandomPosition());
          handleNoClick();
     };

     const getNoButtonText = () => {
          const phrases = [
               "no",
               "hey",
               "hey!!",
               "HEY!!!!",
               "say yes rn",
               "please : 3",
               "say yes or i hit u ",
               "please pookie",
               "hey i made this for u to say yes not no",
               "????",
               "if u dont say yes i sell dinky",
               "and binu",
               "and puffle",
               "and u",
               "babe u keep missing the button",
               "ur not gonna get it its not possible",
               ": ? ? ? ?? ? / / / / ",
               "im gunna tickle u ",
               "hey ur being silly now",
               "i really hit u",
               "pretty please with a cherry on top",
               ": ( ( ( ( ",
               "last chance",
               "hey",
               "i thought you love me",
               "itl be really fun i promise",
               "we can get cheeseburger",
               "we can even get sweet treats",
               "2 sweet treats",
               "3",
               "just kidding 2",
               "youre gonna be sad if you keep saying no",
               "youll regret it ",
               "ur being silly again",
               "if u hit yes by accident it counts",
               "okay it just keeps getting bigger now",
               "im not sure how big it can get",
               "i think it might be infinite",
               "i think its infinite",
               "its not gonna stop caelee",
          ];

          return phrases[Math.min(noCount, phrases.length - 1)];
     };

     return (
          <div className="-mt-16 flex h-screen flex-col items-center justify-center">
               {yesPressed ? (
                    <>
                         <img src={gif} alt="Celebration GIF" />
                         <div className="my-4 text-4xl font-bold">yaYAYAYAAYAYYYAAY!!! thank you here's what we're doing: ~12:00: lunch in suburbs or city, ~2:00 go to the zoo to meet ur monkey friends, 3:00: go to the class that's in the pic below, 6:30: dinner at  <a style={{color: "red"}} className="red" href="https://www.bixi.beer/menu">here</a></div>
                          <div className="my-4 text-4xl font-bold">i heard its good its in logan square </div>
                         <img src={flowers}></img>

                    </>
               ) : (
                    <>
                         {images.map((image, index) => (
                              <img
                                   key={index}
                                   ref={(el) => (imageRefs.current[index] = el)}
                                   src={image}
                                   alt={`Image ${index}`}
                                   style={{
                                        position: "absolute",
                                        left: imagePositions[index]?.x,
                                        top: imagePositions[index]?.y,
                                        width: gifWidth,
                                        height: gifHeight,
                                   }}
                              />
                         ))}
                         <img
                              src={def}
                              alt="Default"
                              style={{
                                   width: gifWidth,
                                   height: gifHeight,
                                   zIndex: 5,
                              }}
                         />
                         <h1 className="my-4 text-4xl" style={{ zIndex: 5 }}>caelee will u be my valentine</h1>
                         <div className="flex items-center">
                              <button
                                   className="mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                                   style={{ fontSize: yesButtonSize, zIndex: 5 }}
                                   onClick={() => setYesPressed(true)}
                              >
                                   Yes
                              </button>
                              <button
                                   onClick={handleNoClick}
                                   onMouseEnter={handleNoHover}
                                   className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                                   style={{ position: "absolute", left: noButtonPos.x, top: noButtonPos.y, zIndex: 99 }}
                              >
                                   {noCount === 0 ? "No" : getNoButtonText()}
                              </button>
                         </div>
                    </>
               )}
          </div>
     );
}