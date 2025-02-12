import { CommonModule } from '@angular/common';
import { Directive, ElementRef, Input, NgModule } from '@angular/core';
import { DomHandler } from '@mazvysp/primeng/dom';

@Directive({
    selector: '[pAutoFocus]',
    host: {
        class: 'p-element'
    }
})
export class AutoFocus {
    constructor(private host: ElementRef) {}

    @Input() autofocus: boolean;

    focused: boolean = false;

    ngAfterViewChecked() {
        if (!this.focused) {
            if (this.autofocus) {
                const focusableElements = DomHandler.getFocusableElements(this.host.nativeElement);

                if (focusableElements.length === 0) {
                    this.host.nativeElement.focus();
                }
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                }

                this.focused = true;
            }
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [AutoFocus],
    declarations: [AutoFocus]
})
export class AutoFocusModule {}
