import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';

function CodeEditor({ code, setCode }: { code: string, setCode: (value: string) => void }) {
  const onChange = React.useCallback((val: string, viewUpdate: any) => {
    console.log('val:', val);
    setCode(val);
  }, [setCode]);

  return (
    <div className="flex flex-col flex-1 w-[100%] h-[100%] gap-9 bg-black">
      <CodeMirror
        value={code}
        height="100%"
        width="100%"
        theme="dark"
        extensions={[cpp()]}
        className="h-[100%] w-[100%] rounded-xl"
        onChange={onChange}
      />
    </div>
  );
}

export default CodeEditor;
