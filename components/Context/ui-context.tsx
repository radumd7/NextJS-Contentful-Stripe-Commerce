import React from "react";

interface UIContextProps {
    scrollTop: number;
    device: 'mobile' | 'tablet' | 'desktop' | undefined;
};

interface UIContextProviderProps {
    children: React.ReactNode;
};

const UIContext = React.createContext({} as UIContextProps);

export default function useUIContext() {
    return React.useContext(UIContext);
};

export const UIContextProvider: React.FC<UIContextProviderProps> = ({
    children
}) => {
    const [ scrollTop, setScrollTop ] = React.useState<number>(0);
    const [ device, setDevice ] = React.useState<'mobile' | 'tablet' | 'desktop'>();

    React.useEffect(() => {
        if(typeof window !== 'undefined'){
            const handleScroll = () => {
                setScrollTop(window.scrollY);
            };
            const handleResize = () => {
                const { innerWidth } = window;
                if(innerWidth < 768){
                    setDevice('mobile');
                };
                if(innerWidth > 767 && innerWidth < 1023){
                    setDevice('tablet');
                };
                if(innerWidth > 1023){
                    setDevice('desktop')
                };
            };
            handleResize();
            window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
            window.addEventListener('resize', handleResize);
            return() => {
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', handleResize);
            };
        };
    }, []);
    
    const value = {
        scrollTop,
        device
    };
    
    return(
        <UIContext.Provider value={value}>{children}</UIContext.Provider>
    );
};