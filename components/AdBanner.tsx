import React, { useEffect } from 'react';

const AdBanner: React.FC = () => {
  useEffect(() => {
    try {
      // Tenta inicializar o anúncio. 
      // O cast (window as any) é necessário pois adsbygoogle não existe no tipo window padrão.
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense falhou ao carregar:", e);
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center overflow-hidden my-4 z-40 relative">
      <div className="text-[10px] text-slate-600 absolute -top-4 w-full text-center">Publicidade</div>
      {/* 
         SUBSTITUA OS VALORES ABAIXO:
         data-ad-client: Seu ID de publicador (ex: ca-pub-123456789)
         data-ad-slot: O ID do bloco de anúncio criado no painel do AdSense
      */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '300px', minHeight: '50px', width: '100%', maxWidth: '728px', height: '90px' }}
        data-ad-client="ca-pub-SEU_ID_ADSENSE"
        data-ad-slot="SEU_ID_SLOT_ANUNCIO"
        data-ad-format="auto"
        data-full-width-responsive="true"
      >
        {/* Placeholder visual para desenvolvimento (o AdSense substituirá isso) */}
        <div className="w-full h-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-500 text-xs">
          Espaço para Anúncio Google
        </div>
      </ins>
    </div>
  );
};

export default AdBanner;