var fso = new ActiveXObject("Scripting.FileSystemObject"); 
var ts = fso.OpenTextFile(WSH.Arguments(1)); 
var str = ts.ReadAll(); 
ts.Close(); 
var ts = fso.OpenTextFile(WSH.Arguments(2), 2, true); 

if (WSH.Arguments(0) == "code")
{
    var previous = str.charAt(0); 
    var length = str.length; 
    var count = 1; 
    var string = ""; 
    var current; 
    for(var i = 1; i <= length; i++) 
    { 
        current = str.charAt(i); 
        if (current == previous) 
        { 
            count++; 
        } 
        else 
        { 
            if(count > 3 || previous == '#') 
            { 
                while (count > 127) 
                { 
                    string += '#'; 
                    string += String.fromCharCode(127); 
                    string += previous; 
                    count -= 127; 
                } 
                if ((count > 3)||(previous == '#')) 
                {
                    string += '#'; 
                    string += String.fromCharCode(count); 
                    string += previous;
                }
                else 
                { 
                    for (var j = 0; j < count; j++) 
                        string += previous; 
                } 
            } 
            else
            {
                for (var j = 0; j < count; j++) 
                    string += previous; 
            } 
            count = 1; 
        } 
        previous = current; 
    }
}
ts.Write(string); 
ts.Close(); 

var ts = fso.OpenTextFile(WSH.Arguments(1)); 
var str = ts.ReadAll(); 
ts.Close(); 

if (WSH.Arguments(0) == "decode") 
{ 
    string = ""; 
    var length = str.length; 
    for(var i = 0; i < length; i++) 
    { 
        if(str.charAt(i) == '#') 
        { 
            var count = str.charAt(i + 1).charCodeAt(); 
            for (var j = 0; j < count; j++) 
                string+= str.charAt(i + 2); 
            i += 2; 
        } 
        else 
        { 
            string += str.charAt(i); 
        } 
    } 
}

var ts = fso.OpenTextFile(WSH.Arguments(2), 2, true); 
ts.Write(string); 
ts.Close();