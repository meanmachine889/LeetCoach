import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';

function CodeEditor() {
  const [value, setValue] = React.useState(`#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}`);
  
  const onChange = React.useCallback((val: string, viewUpdate: any) => {
    console.log('val:', val);
    setValue(val);
  }, []);

  return (
    <div className="flex flex-col w-[100%] h-[100%] gap-9 bg-black">
      <CodeMirror
        value={value}
        height="100%"
        width="100%"
        theme="dark"
        extensions={[cpp()]}
        className="h-[100%] bg-black text-white rounded-lg"
        onChange={onChange}
      />
    </div>
  );
}

export default CodeEditor;
