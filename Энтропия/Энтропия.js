var fso = new ActiveXObject("Scripting.FileSystemObject"); 

str = WScript.StdIn.ReadLine();
var array = [];
var length = str.length;
var lengthOfArray = 0;
var entrophy = 0;
for (var i = 0 ; i < length; i++)
{
	array[str.charAt(i)] = 0;
}
for (var i = 0 ; i < length; i++)
{
	array[str.charAt(i)]++;
}
for (var i in array)
{
	lengthOfArray++;
	array[i] = array[i] / length;
}
for (var i in array)
{
	 entrophy -= array[i] * Math.log(array[i]) / Math.log(lengthOfArray);
}
WSH.echo(entrophy);

