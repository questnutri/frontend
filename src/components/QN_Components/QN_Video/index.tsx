import React from 'react'

export default function LoadingScreen() {
    return (
        <div style={{
        }}>
            <video autoPlay loop muted style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            }}>
                <source src="/videos/logoReveal_whiteBg.mp4" type="video/mp4" />
                Seu navegador não suporta o formato de vídeo.
            </video>
        </div>
    )
}