fso = new ActiveXObject("Scripting.FileSystemObject");
file = fso.OpenTextFile(WSH.Arguments(0));
prog = file.ReadAll();
commands = prog.split("\r\n");
var input = [];
function handleInstruction(currentInstruction, options) 
{
switch (currentInstruction) 
{
case 'set':
    input[options[0]] = parseInt(options[1]);
    break;
case 'subtraction':
    input[options[2]] = input[options[0]] - input[options[1]];
    break; 
case 'multiply':
    input[options[2]] = input[options[0]] * input[options[1]];
    break;
case 'compare':
    if (input[options[0]] == input[options[1]]) 
    {
    count = count + 1;
    }
    break;
case 'print':
    WSH.Echo(input[options[0]]);
    break;
case 'goto':
    count = parseInt(options[0] - 1) - 1;
    break;
case 'check':
    if (input[options[0]] <= 0 || input[options[1]] <= 0)
    {
        WSH.Echo('1');
        count = commands.length;
    }
    break;
}
}
var count = 0;
while (count < commands.length) 
   {
    currentInstruction = commands[count].split(" ")[0];
    options = [];
    for (var j = 1; j < commands[count].split(" ").length; j++) {
        options.push(commands[count].split(" ")[j]);
    }
    handleInstruction(currentInstruction, options);
    count += 1;
}