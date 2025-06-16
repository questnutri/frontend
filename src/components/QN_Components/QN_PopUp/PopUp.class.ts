import { QN_PopUp_StyleContextType } from "./popup.style.context"

export default class PopUp {
    private styleConfig: QN_PopUp_StyleContextType

    constructor() {
        this.styleConfig = {
            customButtons: { items: [] },
            titleConfig: { title: null, textColor: '', textAlign: 'center', fontWeight: '600' },
            windowConfig: { width: 'auto', height: 'auto', padding: '8px', gapBetweenTextAndButtons: '0px', blockOutsideClose: false },
            bodyConfig: { content: null, textAlign: 'center' },
            defaultButtons: { closeButton: false, okButton: false, buttonAlign: 'center' }
        } as Required<QN_PopUp_StyleContextType>
    }

    title(title: string) {
        this.styleConfig.titleConfig!.title = title
        return this
    }

    textColor(color: string) {
        this.styleConfig.titleConfig!.textColor = color
        return this
    }

    titleAlign(align: 'left' | 'center' | 'right') {
        this.styleConfig.titleConfig!.textAlign = align
        return this
    }

    titleFontWeight(weight: string | undefined) {
        this.styleConfig.titleConfig!.fontWeight = weight
        return this
    }

    width(width: string) {
        this.styleConfig.windowConfig!.width = width
        return this
    }

    height(height: string) {
        this.styleConfig.windowConfig!.height = height
        return this
    }

    padding(padding: string) {
        this.styleConfig.windowConfig!.padding = padding
        return this
    }

    gapBetweenTextAndButtons(gap: string) {
        this.styleConfig.windowConfig!.gapBetweenTextAndButtons = gap
        return this
    }

    blockOutsideClose(block: boolean) {
        this.styleConfig.windowConfig!.blockOutsideClose = block
        return this
    }

    bodyContent(content: React.ReactNode) {
        this.styleConfig.bodyConfig!.content = content
        return this
    }

    bodyTextAlign(align: 'left' | 'center' | 'right') {
        this.styleConfig.bodyConfig!.textAlign = align
        return this
    }

    closeButton() {
        this.styleConfig.defaultButtons!.closeButton = true
        return this
    }

    okButton() {
        this.styleConfig.defaultButtons!.okButton = true
        return this
    }

    buttonAlign(align: 'left' | 'center' | 'right') {
        this.styleConfig.defaultButtons!.buttonAlign = align
        return this
    }

    customButtons(items: any[]) {
        this.styleConfig.customButtons!.items = items
        return this
    }

    build() {
        return this.styleConfig
    }
}
