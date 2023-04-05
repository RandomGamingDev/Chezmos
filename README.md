# Chezmos
Basically an application similar to Desmos that uses javascript for graph plotting allowing for the easy use of external libraries and more complex mathematical functions and concepts like recursion.

Actions: <br/>
To start open up the application on your web browser. There you can use the + and - features to create new functions with each function being on a different row. With a column for the name, one for the color, and one for the javascript code containing the equation itself. To run simply press the run button, with any errors being printed out to the console right below the graph. If you want to resize the graph simply resize domain by declaring the low, high, and step of a range. The limit for the number of x values that can be in this domain is 10000. If you want to add libraries, for example math or display libraries you can simply use the add library button to add whatever libraries you want. Although, beware, due to how javascript works you can't just remove these libraries so any that you add are added to the instance until you refresh.

How to create a function: <br/>
When creating an equation you don't have to declare the function part. Simply type some normal javascript code and `return` the value that you want to be graphed. To call your own function for recursion simply call `self(x)` (although just as a reminder u can't recurse too many times). You could also use `trueSelf(x)` if you want, but `self(x)` is typically faster as it caches the return values so that they don't have to be recaculated which is 99% of the time what you want especially when calculating larger recursive graphs.

Function examples: <br/>
```js
return Math.sin(x);

// and

if (x == 1)
  return 32;
return self(x - 1) + 8;
```

Credit to Knectoparapolosis for the name. You can find his github here: https://github.com/Knectoparapolosis.
