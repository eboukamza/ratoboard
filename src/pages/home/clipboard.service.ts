import { Injectable } from "@angular/core";

@Injectable()
export class ClipboardService {

    // I copy the given value to the user's system clipboard. Returns a promise that
    // resolves to the given value on success or rejects with the raised Error.
    public copy( value: string ) : Promise<string> {

        var promise = new Promise(
            ( resolve, reject ) : void => {

                var textarea = null;

                try {

                    // NOTE: This Textarea is being rendered off-screen.
                    textarea = document.createElement( "textarea" );
                    textarea.style.height = "0px";
                    textarea.style.left = "-100px";
                    textarea.style.opacity = "0";
                    textarea.style.position = "fixed";
                    textarea.style.top = "-100px";
                    textarea.style.width = "0px";
                    document.body.appendChild( textarea );

                    textarea.value = value;
                    textarea.select();
                    document.execCommand( "copy" );

                    resolve( value );

                } finally {
                    // Cleanup - remove the Textarea from the DOM if it was injected.
                    if ( textarea && textarea.parentNode ) {
                        textarea.parentNode.removeChild( textarea );
                    }

                }

            }
        );

        return promise;
    }

}
