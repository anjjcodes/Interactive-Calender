import React from 'react';

export const BinderClip = () => {
    return (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
            
            <div className="w-8 h-12 border-2 border-gold rounded-full -mb-10 opacity-80" />
            
            
            <div className="relative">
                
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-8 border-2 border-gold rounded-t-lg rotate-12 origin-bottom" />
                
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-8 border-2 border-gold rounded-t-lg -rotate-12 origin-bottom z-20" />
                
                
                <div className="w-12 h-10 bg-gold rounded-sm shadow-md relative z-10 flex items-center justify-center">
                    <div className="w-10 h-0.5 bg-black/10 absolute top-2" />
                    <div className="w-10 h-0.5 bg-black/10 absolute bottom-2" />
                </div>
            </div>
            
            
            <div className="w-16 h-4 bg-black/10 blur-md -mt-1 rounded-full px-2" />
        </div>
    );
};
