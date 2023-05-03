
export default function replaceSymbol(text, targetSymbol, replacementSymbol){
    const index = text.indexOf(targetSymbol);
    if(index !== -1){
        text = text.substring(0, index) + replacementSymbol + text.substring(index + 1);
    }
    return text;
}