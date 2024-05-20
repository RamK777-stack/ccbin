'use client';

import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';

type FooterContextType = {
  resetState: boolean;
  resetEditorState: () => void;
};

const EditorContext = createContext<FooterContextType | undefined>(undefined);

export const useEditorContext = (): FooterContextType => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useFooterContext must be used within a FooterProvider');
  }
  return context;
};

export const EditorProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [resetState, setResetState] = useState<boolean>(false);

  const resetEditorState = (): void => {
    setResetState((prevState) => !prevState);
  };

  // Provide the context value to children components
  return (
    <EditorContext.Provider value={{ resetState, resetEditorState }}>
      {children}
    </EditorContext.Provider>
  );
};
