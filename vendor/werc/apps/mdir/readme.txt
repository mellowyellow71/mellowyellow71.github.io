INSTALL:

put this folder in e.g. /werc/apps/mdir

put your mdir in e.g. /werc/sites/example.com/mail/
(such that all the messages land in /werc/sites/example.com/mail/mbox/)

mkdir /werc/sites/example.com/mail/_werc
echo "conf_enable_mdir" > /werc/sites/example.com/mail/_werc/config

good luck.
