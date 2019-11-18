var fso = new ActiveXObject('Scripting.FileSystemObject');
var file = fso.OpenTextFile('string.txt');
var string = file.ReadAll();
file.Close();
var substring = WSH.StdIn.ReadLine();

var alphabet = [];
for (var i = 0; i < substring.length; i++)
    alphabet[substring.charAt(i)] = 0;

var transitionTable = new Array(substring.length + 1);
for (var j = 0; j <= substring.length; j++)
    transitionTable[j] = [];

for(var i in alphabet)
    transitionTable[0][i] = 0;

for (var j = 0; j < substring.length; j++)
{
    prev = transitionTable[j][substring.charAt(j)];
    transitionTable[j][substring.charAt(j)] = j + 1;
    for (var i in alphabet)
        transitionTable[j+1][i] = transitionTable[prev][i];
}

var ArgumentsBar = "";
ArgumentsBar += '   ';
var chars = "";
for (var i = 0 ;i <= substring.length; i++)
{
	if (chars.indexOf(substring.charAt(i)) == -1)
	{
    ArgumentsBar += substring.charAt(i) + ' ';
	chars += substring.charAt(i);
	}
}
WSH.echo(ArgumentsBar);

for (var j = 0; j <= substring.length; j++)
{
    var out = j + ' ' + '|';
    for (var i in alphabet)
        out += transitionTable[j][i] + ' ';
    WSH.echo(out);
}

var result = [];
var current = 0;

for (var i = 0; i < string.length; i++)
{
    if (!transitionTable[current][string.charAt(i)])
        transitionTable[current][string.charAt(i)] = 0;
    current = transitionTable[current][string.charAt(i)];
    if (current == substring.length)
        result.push(i - substring.length + 1);
}

if (result.length == 0)
    WSH.echo('Substring not found');
else WSH.echo('indexes: ' + result);