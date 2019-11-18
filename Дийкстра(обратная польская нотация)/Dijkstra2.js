var fso = new ActiveXObject("Scripting.FileSystemObject");
var file = fso.OpenTextFile(WSH.arguments(0));
var input = file.ReadAll();
var priorities = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3};         
var result = ""; 
var stack = []; 
var stac = [];
for (var i = 0; i < input.length; i++) 
{ 
    var c = input.charAt(i); 
    if (!(c == "+" || c == "-" || c == "*" || c == "/" || c == "^"|| c == "("|| c == ")" )) 
        result += c; 
    else if (c == '(')		
        stack.push(c); 
    else if (c == ')') 
	{
        while (stack[stack.length - 1] != "(")
            result += stack.pop();
		stack.pop();
	}		
    else 
    { 
	while (stack.length != 0 && priorities[c] <= priorities[stack[stack.length - 1]]) 
            result += stack.pop(); 
        stack.push(c); 
    } 
}
while (!stack.length == 0) 
    result += stack.pop(); 
 WSH.Echo(result);
     
for (i = 0; i < result.length ; i++) 
{
	if (priorities[result.charAt(i)] === undefined) 
		stac.push(result.charAt(i)); 
	else 
	{
		var a = parseInt(stac.pop());
		var b = parseInt(stac.pop());
		if(result.charAt(i) == "*")
			stac.push(a * b);
		if(result.charAt(i) == "^")
			stac.push(Math.pow(b,a));
		if(result.charAt(i) == "/")
			stac.push(a / b);
		if(result.charAt(i) == "+")
			stac.push(a + b);
		if(result.charAt(i) == "-")
			stac.push(a - b);
			
	}
}
WSH.Echo(stac);