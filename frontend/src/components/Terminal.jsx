import { useState } from 'react';
import { terminalCommands } from '../data/portfolio';

export default function Terminal() {
  const [command, setCommand] = useState('help');
  const [output, setOutput] = useState(terminalCommands.help);

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalized = command.trim().toLowerCase();
    const nextOutput = terminalCommands[normalized] || ['Command not found. Try: help, about, skills, projects, github, contact, resume'];
    setOutput(nextOutput);
  };

  return (
    <div className="terminal-panel">
      <div className="terminal-header">
        <span />
        <span />
        <span />
      </div>
      <div className="terminal-body">
        <p>deepak@portfolio:~$ whoami</p>
        <p>Full-Stack Developer</p>
        <p>deepak@portfolio:~$ stack</p>
        <div className="terminal-badges">
          <span>React</span>
          <span>Node.js</span>
          <span>Express.js</span>
          <span>SQL</span>
          <span>Git</span>
        </div>

        <form onSubmit={handleSubmit} className="terminal-form">
          <label htmlFor="terminal-command">deepak@portfolio:~$</label>
          <input
            id="terminal-command"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="help"
          />
        </form>

        <div className="terminal-output">
          {output.map((line, index) => (
            <p key={`${line}-${index}`}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
