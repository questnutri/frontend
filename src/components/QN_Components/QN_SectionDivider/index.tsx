import { Divider } from "@nextui-org/react"

interface QN_SectionDividerProps {
    title?: string
    sectionPadding?: string
    styleConfig?: {
        lineConfig?: {
            leftPadding?: string
            rightPadding?: string
            topPadding?: string
            bottomPadding?: string
            paddingHorizontal?: string
            paddingVertical?: string
            dontPadAtCenter?: boolean
            color?: string
        }
        dividerConfig?: {
            bottomDistance?: string
        }
        titleConfig?: {
            fontSize?: string
            textAlign?: string
            color?: string
            fontWeight?: string
        }
        bottomLine?: {
            active?: boolean
            topDistance?: string
        }
    }
    children: React.ReactNode
}

export default function QN_SectionDivider({
    title,
    sectionPadding = '0',
    styleConfig,
    children
}: QN_SectionDividerProps) {
    const Line = ({ side }: { side: 'left' | 'right' }) => {
        const horizontalPadding = styleConfig?.lineConfig?.paddingHorizontal || '0'
        const verticalPadding = styleConfig?.lineConfig?.paddingVertical || '0'

        const paddingStyles = {
            paddingTop: styleConfig?.lineConfig?.topPadding || verticalPadding,
            paddingBottom: styleConfig?.lineConfig?.bottomPadding || verticalPadding,
            paddingRight: side === 'left' && styleConfig?.lineConfig?.dontPadAtCenter
                ? '0'
                : styleConfig?.lineConfig?.rightPadding || horizontalPadding,
            paddingLeft: side === 'right' && styleConfig?.lineConfig?.dontPadAtCenter
                ? '0'
                : styleConfig?.lineConfig?.leftPadding || horizontalPadding,
        }

        const width = styleConfig?.lineConfig?.dontPadAtCenter ? 'calc(50% - 20px)' : '100%'

        return (
            <div style={{ ...paddingStyles, width }}>
                <Divider style={{ flex: 1, backgroundColor: styleConfig?.lineConfig?.color }} />
            </div>
        )
    }

    return (
        <div style={{ width: '100%', padding: sectionPadding }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                marginBottom: styleConfig?.dividerConfig?.bottomDistance || '15px',
            }}>
                <Line side="left" />
                {title && (
                    <span style={{
                        textAlign: styleConfig?.titleConfig?.textAlign as 'left' | 'center' | 'right' || 'center',
                        padding: '0 20px',
                        whiteSpace: 'nowrap',
                        fontSize: styleConfig?.titleConfig?.fontSize || '12px',
                        color: styleConfig?.titleConfig?.color || '#676767',
                        fontWeight: styleConfig?.titleConfig?.fontWeight || '500',
                    }}>
                        {title}
                    </span>
                )}
                <Line side="right" />
            </div>
            {children}
            {styleConfig?.bottomLine?.active && (
                <div style={{width: '100%', marginTop: styleConfig?.bottomLine?.topDistance || '20px'}}>
                    <Line side="left" />
                </div>
            )}
        </div>
    )
}
