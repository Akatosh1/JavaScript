var fso = new ActiveXObject("Scripting.FileSystemObject"); 
var ts = fso.OpenTextFile(WSH.Arguments(0)); 
var string = ts.ReadAll();
var cipher = WSH.arguments(1);
var shiftedAlphabet = "";
var newString = " ";
var inputString = [];
var key = 0;
var keyMin = 0;
var alphabet = "abcdefghijklmnopqrstuvwxyz";
shiftedAlphabet += alphabet.slice(alphabet.length - cipher, 26);
shiftedAlphabet += alphabet;
WSH.echo('alphabet for shift:' + '  ' + shiftedAlphabet);

var frequency = [
    0.0817, 
    0.0145,
    0.0278,
    0.0425,
    0.0170,
    0.0223,
    0.0202,
    0.0609,
    0.0697,
    0.0015,
    0.0387,
    0.0403,
    0.0241,
    0.0675,
    0.0750,
    0.0193,
    0.0010,
    0.0599,
    0.0633,
    0.0926,
    0.0276,
    0.0098,
    0.0537,
    0.0015,
    0.0398,
    0.0008
];

//кодирование
for(var i = 0; i < string.length; i++)
{   
    if(alphabet.indexOf(string.charAt(i)) != -1)
	    newString += (shiftedAlphabet.charAt(parseInt(shiftedAlphabet.indexOf(string.charAt(i))) + parseInt(cipher)));
    else
	    newString += string.charAt(i);
}

WSH.echo('shifted string:' + '  ' + newString);

//декодирование частотным анализом
var min = 1000000;
var key = 0;
for (var i = 0; i < 26; i++)
{
    var currentFrequency = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var currentSumm = 0;
    for (var j = 0; j < newString.length; j++)
    {
        var z = alphabet.indexOf(newString.charAt(j)) - i;
		if (z < 0)
        z += 26;
        currentFrequency[z]++;
    }
    for (var j = 0; j < alphabet.length; j++)
    {
		if (currentFrequency[j] != 0)
        {
            currentFrequency[j] = currentFrequency[j] / newString.length;
            currentSumm += Math.abs(frequency[j] - currentFrequency[j]);
		}
    }
    if (currentSumm < min)
    {
        min = currentSumm;
        key = i;
    }
}
var originalString = "";
for (var i = 0; i < newString.length; i++)
{
	if (alphabet.indexOf(newString.charAt(i)) != -1)
	{
    var j = alphabet.indexOf(newString.charAt(i)) - key;
	if (j < 0)
    j += 26;
    originalString += alphabet.charAt(j);
	}
	else
	{
		originalString += newString.charAt(i);
	}
}
WSH.echo('original string:' + '  ' + originalString);








