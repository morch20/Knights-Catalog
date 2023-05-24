import { regexCodeWithSpace, regexCode } from './constants';

export function getTagsHighlights(text, highlight, last){

    const arr = text?.split("\n");

    arr?.forEach(element => {

        if(element){
            
            if(element.substring(0,2) === "• "){
                element = element.replace("• ", "");
            }

            if(element.search(regexCode) === 0){
                if(last){
                    if(highlight.current.hasOwnProperty(element.substring(0,8)) ){
                        highlight.current[element.substring(0,8)] = true;
                    }
                }
                else{
                    highlight.current[element.substring(0,8)] = false;
                }
            }
            else if(element.search(regexCodeWithSpace) === 0){
                if(last){
                    if(highlight.current.hasOwnProperty(element.substring(0,9)) ){
                        highlight.current[element.substring(0,9)] = true;
                    }
                }
                else{
                    highlight.current[element.substring(0,9)] = false;
                }
            }
        }
    })
}
