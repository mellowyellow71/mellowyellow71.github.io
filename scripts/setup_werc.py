"""Install werc's official Plan 9 dependency into a local cache."""
from pathlib import Path
import subprocess
from werc_runtime import PLAN9, REQUIRED_TOOLS, prepare

PIN = 'b6564bd96ca189c69e28797738dad56f91eb5967'
URL = 'https://github.com/9fans/plan9port.git'

if not all((PLAN9 / 'bin' / name).is_file() for name in REQUIRED_TOOLS):
    if not (PLAN9 / '.git').is_dir():
        PLAN9.mkdir(parents=True, exist_ok=True)
        if any(PLAN9.iterdir()):
            raise RuntimeError('Choose an empty WERC_PLAN9 directory for the runtime installation.')
        subprocess.run(['git', 'init', str(PLAN9)], check=True)
        subprocess.run(['git', '-C', str(PLAN9), 'remote', 'add', 'origin', URL], check=True)
    subprocess.run(['git', '-C', str(PLAN9), 'fetch', '--depth', '1', 'origin', PIN], check=True)
    subprocess.run(['git', '-C', str(PLAN9), 'checkout', '--detach', PIN], check=True)
    (PLAN9 / 'LOCAL.config').write_text('WSYSTYPE=nowsys\n')
    print('Building Plan 9 tools in ' + str(PLAN9), flush=True)
    subprocess.run(['./INSTALL'], cwd=PLAN9, check=True)
prepare()
print('werc runtime ready: ' + str(PLAN9))
