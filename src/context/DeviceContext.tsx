// context/DeviceContext.tsx

import { createContext, useContext, useEffect, useState } from 'react';

interface DeviceContextProps {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const DeviceContext = createContext<DeviceContextProps>({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
});

export const useDevice = () => useContext(DeviceContext);

const getDeviceType = (userAgent: string) => {
  const isMobile = /Mobile|Android|iP(ad|hone|od)|IEMobile|BlackBerry/i.test(userAgent);
  const isTablet = /Tablet|iPad/i.test(userAgent);
  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
  };
};

interface DeviceProviderProps {
  userAgent?: string;
  children: React.ReactNode;
}

export const DeviceProvider = ({ userAgent = '', children }: DeviceProviderProps) => {
  const [device, setDevice] = useState<DeviceContextProps>(getDeviceType(userAgent));

  useEffect(() => {
    if (!userAgent) {
      const userAgentString = navigator.userAgent;
      setDevice(getDeviceType(userAgentString));
    }
  }, [userAgent]);

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDeviceType(navigator.userAgent));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DeviceContext.Provider value={device}>
      {children}
    </DeviceContext.Provider>
  );
};
