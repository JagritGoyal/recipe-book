import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
	selector: '[appDropdown]'
})

export class DropdownDirective implements AfterViewInit {
	constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
	isOpen = false;

	sibling: ElementRef;

	ngAfterViewInit() {
		this.sibling = this.elementRef.nativeElement.nextElementSibling;
	}

	// @HostBinding('class.show') show: boolean = false;
	@HostListener('click') toggleOpen(eventData: Event) {
		// console.log(this.sibling);

		if (!this.isOpen) {
			this.renderer.addClass(this.sibling, 'show');
		} else {
			this.renderer.removeClass(this.sibling, 'show');
		}
		this.isOpen = !this.isOpen
	}
	@HostListener('document:click', ['$event.target']) onClickPage(targetElement: HTMLElement) {
		// Make sure the button is the element that was clicked
		const isButtonClicked = this.elementRef.nativeElement.contains(targetElement);
		if (isButtonClicked) {
			// Click occurred inside the dropdown or dropdown menu is not initialized, do nothing
			return;
		}

		if (this.isOpen) {
			this.renderer.removeClass(this.sibling, 'show');
		}

		this.isOpen = false;		
	}
}