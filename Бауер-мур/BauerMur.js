var fso = new ActiveXObject('Scripting.FileSystemObject');
var file = fso.OpenTextFile('string.txt');
var string = file.ReadAll();
file.Close();

var substring = WSH.StdIn.ReadLine();

var result  = [];
var entry = [];
var count = 0;
for(var k = 0; k < substring.length; k++) 
{
    entry[substring.charAt(k)] = k + 1;
}

var i = substring.length - 1;
while (i < string.length)
{
	//WSH.echo(i + " " + "new");
	if (entry[string.charAt(i)] == null)
	{
		//WSH.echo(i + " " + "in1");
		i+= substring.length;
	}	
    else
	{
		for (var j = 0; j < substring.length; ++j)
		{
			if (substring.charAt(substring.length - 1 - j) == string.charAt(i-j))
			{
				//WSH.echo(i + " " + "new2")
				if (j == substring.length - 1)
				{
					result.push(i - j)
					i+=1;
					break;
				}
			}
			
			else
			{
				//WSH.echo(i + " " + "new3");
				 i +=  Math.max(1, substring.length - entry[string.charAt(i)]);
				 break;
			}
		}
	}
}


if (result.length == 0)
    WSH.echo('Substring not found');
else WSH.echo(result);



var result1 = [];
for (var i = 0; i <= string.length - substring.length; i++) 
{
    for (var j = 0; string.charAt(i + j) == substring.charAt(j); j++) 
    {
        if (j == substring.length - 1) 
        {
            result1.push(i);
            break;
        }
    }
}

if (result1.length == 0)
	WSH.echo('Substring not found');
else WSH.echo(result1);