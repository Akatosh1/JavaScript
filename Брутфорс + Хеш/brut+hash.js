var fso = new ActiveXObject('Scripting.FileSystemObject');
var file = fso.OpenTextFile('string.txt');
var string = file.ReadAll();
file.Close();


var substring = WSH.StdIn.ReadLine();
//Brute Forse
WSH.echo('Brute forse');
var result = [];
var start = (new Date()).getTime();

for (var i = 0; i <= string.length - substring.length; i++) 
{
    for (var j = 0; string.charAt(i + j) == substring.charAt(j); j++) 
    {
        if (j == substring.length - 1) 
        {
            result.push(i);
            break;
        }
    }
}
var end = (new Date()).getTime();
if (result.length == 0)
    WSH.echo('Substring not found');
else WSH.echo('Position: ' + result);
WSH.echo('time of working: ' + (end - start) + ' milliseconds');

//Rabin-Carp
function calculateHashRC(string) 
{
    var hash = 0;
    for (var i = 0; i < string.length; i++)
        hash += string.charCodeAt(i) * (1 << (string.length - i));
    return hash;
}

WSH.echo('Rabin-Carp');
var result = [];
var substringHash = calculateHashRC(substring);
var stringHash = calculateHashRC(string.substr(0, substring.length));
var start = (new Date()).getTime();
var collisionCount = 0;
var fl = 0;

for (var i = 0; i <= string.length - substring.length; i++) 
{
    if (substringHash == stringHash) 
    {
        for (var j = 0; string.charAt(i + j) == substring.charAt(j); j++) 
        {
            if (j == substring.length - 1) 
            {
                result.push(i);
                fl = 1;
                break;
            }
        }
        if (fl == 1)
        {
            collisionCount++;
            fl = 0;
        }
    }
    stringHash = 2 * (stringHash - string.charCodeAt(i) * (1 << substring.length) + string.charCodeAt(i + substring.length));
}

collisionCount -= result.length; 
var end = (new Date()).getTime();
if (result.length == 0)
    WSH.echo('Substring not found');
else WSH.echo('Position: ' + result);
WSH.echo('Collisions: ' + collisionCount);
WSH.echo('time of working: ' + (end - start) + ' milliseconds');

//Code sum
function calculateHashSum(string) 
{
    var hash = 0;
    for (var i = 0; i < string.length; i++)
        hash += string.charCodeAt(i);
    return hash;
}

WSH.echo('Sum of code');
var result = [];
var substringHash = calculateHashSum(substring);
var stringHash = calculateHashSum(string.substr(0, substring.length));
var start = (new Date()).getTime();
var collisionCount = 0;
var fl = 0;

for (var i = 0; i <= string.length - substring.length; i++) 
{
    if (substringHash == stringHash) 
    {
        for (var j = 0; string.charAt(i + j) == substring.charAt(j); j++) 
        {
            if (j == substring.length - 1) 
            {
                result.push(i);
                fl = 1;
                break;
            }
        }
        if (fl == 1)
        {
            collisionCount++;
            fl = 0;
        }
    }
    stringHash = stringHash - string.charCodeAt(i) + string.charCodeAt(i + substring.length);
}

collisionCount -= result.length; 
var end = (new Date()).getTime();
if (result.length == 0)
    WSH.echo('Substring not found');
else WSH.echo('Position: ' + result);
WSH.echo('Collisions: ' + collisionCount);
WSH.echo('time of working: ' + (end - start) + ' milliseconds');

//Code sqr sum
function calculateHashSQR(string) 
{
    var hash = 0;
    for (var i = 0; i < string.length; i++)
        hash += (Math.pow(string.charCodeAt(i), 2));
    return hash;
}

WSH.echo('Sum of code square');
var result = [];
var substringHash = calculateHashSQR(substring);
var stringHash = calculateHashSQR(string.substr(0, substring.length));
var start = (new Date()).getTime();
var collisionCount = 0;
var fl = 0;

for (var i = 0; i <= string.length - substring.length; i++) 
{
    if (substringHash == stringHash) 
    {
        for (var j = 0; string.charAt(i + j) == substring.charAt(j); j++) 
        {
            if (j == substring.length - 1) 
            {
                result.push(i);
                fl = 1;
                break;
            }
        }
        if (fl == 1)
        {
            collisionCount++;
            fl = 0;
        }
    }
    stringHash = stringHash - Math.pow(string.charCodeAt(i), 2) + Math.pow(string.charCodeAt(i + substring.length), 2);
}

collisionCount -= result.length; 
var end = (new Date()).getTime();
if (result.length == 0)
    WSH.echo('Substring not found');
else WSH.echo('Position: ' + result);
WSH.echo('Collisions: ' + collisionCount);
WSH.echo('time of working: ' + (end - start) + ' milliseconds');