/**
 * SnackbarContext — global toast for success/error messages (WBS toasts).
 */

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Snackbar } from 'react-native-paper';
import { palette } from '../theme/theme';

type ToastKind = 'success' | 'error' | 'info';

export interface SnackbarContextValue {
  showToast: (message: string, kind?: ToastKind) => void;
}

const SnackbarContext = createContext<SnackbarContextValue>({ showToast: () => undefined });

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [kind, setKind] = useState<ToastKind>('info');

  const showToast = useCallback((msg: string, k: ToastKind = 'info') => {
    setMessage(msg);
    setKind(k);
    setVisible(true);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  const bg =
    kind === 'success' ? palette.success : kind === 'error' ? palette.error : palette.primary;

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={4000}
        style={{ backgroundColor: bg }}
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar(): SnackbarContextValue {
  return useContext(SnackbarContext);
}

export default SnackbarContext;
