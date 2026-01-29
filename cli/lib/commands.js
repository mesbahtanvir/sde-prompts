const fs = require('fs');
const path = require('path');
const os = require('os');

const VERSION = require('../package.json').version;
const COMMANDS_DIR = path.join(__dirname, '..', 'commands');
const CLAUDE_COMMANDS_DIR = path.join(os.homedir(), '.claude', 'commands');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getInstalledVersion() {
  const helpFile = path.join(CLAUDE_COMMANDS_DIR, 'pdd-help.md');
  if (fs.existsSync(helpFile)) {
    const content = fs.readFileSync(helpFile, 'utf8');
    const match = content.match(/<!-- pdd v([\d.]+) -->/);
    return match ? match[1] : null;
  }
  return null;
}

async function install() {
  console.log('Installing PDD commands to ~/.claude/commands/...\n');

  ensureDir(CLAUDE_COMMANDS_DIR);

  const commandFiles = fs.readdirSync(COMMANDS_DIR).filter(f => f.endsWith('.md'));

  for (const file of commandFiles) {
    const src = path.join(COMMANDS_DIR, file);
    const dest = path.join(CLAUDE_COMMANDS_DIR, file);

    // Read source and inject version
    let content = fs.readFileSync(src, 'utf8');
    content = `<!-- pdd v${VERSION} -->\n${content}`;

    fs.writeFileSync(dest, content);
    console.log(`  ✓ ${file}`);
  }

  console.log(`\n✅ Installed ${commandFiles.length} commands (v${VERSION})`);
  console.log('\nYou can now use these commands in any Claude Code session:');
  console.log('  /pdd-help        - Show all commands');
  console.log('  /pdd-prd-create  - Create a new PRD');
  console.log('  /pdd-init        - Initialize PDD in your project');
}

async function uninstall() {
  console.log('Removing PDD commands from ~/.claude/commands/...\n');

  if (!fs.existsSync(CLAUDE_COMMANDS_DIR)) {
    console.log('No commands directory found. Nothing to uninstall.');
    return;
  }

  const commandFiles = fs.readdirSync(COMMANDS_DIR).filter(f => f.endsWith('.md'));
  let removed = 0;

  for (const file of commandFiles) {
    const dest = path.join(CLAUDE_COMMANDS_DIR, file);
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
      console.log(`  ✓ Removed ${file}`);
      removed++;
    }
  }

  console.log(`\n✅ Removed ${removed} commands`);
}

async function update() {
  const installedVersion = getInstalledVersion();

  if (!installedVersion) {
    console.log('PDD commands not installed. Running install...\n');
    await install();
    return;
  }

  console.log(`Installed version: v${installedVersion}`);
  console.log(`Latest version: v${VERSION}`);

  if (installedVersion === VERSION) {
    console.log('\n✅ Already up to date!');
    return;
  }

  console.log('\nUpdating commands...\n');
  await install();
}

function showVersion() {
  console.log(`pdd-dev v${VERSION}`);

  const installedVersion = getInstalledVersion();
  if (installedVersion) {
    console.log(`Installed commands: v${installedVersion}`);
    if (installedVersion !== VERSION) {
      console.log('\n⚠️  Installed commands are outdated. Run "pdd-dev update" to update.');
    }
  } else {
    console.log('Commands not installed. Run "pdd-dev install" to install.');
  }
}

function showHelp() {
  console.log(`
pdd-dev - PRD Driven Development CLI

Usage:
  pdd-dev install     Install PDD commands to ~/.claude/commands/
  pdd-dev uninstall   Remove PDD commands from ~/.claude/commands/
  pdd-dev update      Update commands to latest version
  pdd-dev --version   Show version information
  pdd-dev --help      Show this help message

After installation, these slash commands are available in Claude Code:
  /pdd-help               Show all PDD commands and usage
  /pdd-prd-create         Create a new PRD
  /pdd-prd-list           List all PRDs with status
  /pdd-init               Initialize PDD in current project
  /pdd-upgrade            Check for and install updates
  /pdd-find-unimplemented Find PRD features not implemented
  /pdd-find-untested      Find code without tests
  /pdd-find-drift         Find code that doesn't match PRD
  /pdd-find-ux-issues     Find UX problems
  /pdd-find-bugs          Find bugs and quality issues

Learn more: https://github.com/mesbahtanvir/prd-driven-dev
`);
}

module.exports = {
  install,
  uninstall,
  update,
  showVersion,
  showHelp,
};
