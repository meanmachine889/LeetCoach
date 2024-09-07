import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  try {
    
    const { code } = await req.json();
    console.log('Received code:', code); 

    
    const d1Path = path.join(process.cwd(), 'D1');
    
    
    const filePath = path.join(d1Path, 'main.cpp');
    fs.writeFileSync(filePath, code);

    
    const dockerBuildCommand = `docker build -t cpp_test:1 ${d1Path}`;
    const dockerRunCommand = 'docker run --rm cpp_test:1';
    
    
    await execAsync(dockerBuildCommand);
    const { stdout, stderr } = await execAsync(dockerRunCommand);

    
    if (stderr) {
      console.error('Error:', stderr);
      return NextResponse.json({ error: stderr }, { status: 500 });
    }

    console.log('Output:', stdout);
    return NextResponse.json({ output: stdout }, { status: 200 });

  } catch (error) {
    console.error('Error running code:', error);
    return NextResponse.json({ error: 'Error running code' }, { status: 500 });
  }
}

export const config = {
  runtime: 'edge',
};
