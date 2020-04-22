function stripLower(string){
    var stripped = string.replace(/\s+/g, '');
    stripped.toLowerCase();
    console.log(stripped);
    return stripped;
}

stripLower("Ace Ventura");