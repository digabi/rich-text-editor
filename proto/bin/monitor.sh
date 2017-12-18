#!/bin/bash

trap cleanup EXIT

cleanup() {
    date "+%F %T stopping monitor.sh ($$)"
}

date "+%F %T starting monitor.sh ($$)"
while true
do
    if ! http_proxy="" curl --fail --silent --max-time 5 "http://$OPENSHIFT_NODEJS_IP:$OPENSHIFT_NODEJS_PORT" > /dev/null
    then
        date "+%F %T server stuck, killing.."
        killall -9 node
        for i in $(seq 10)
        do
            killall -0 node 2>&1 /dev/null || break
            sleep 1
        done
        date "+%F %T restarting"
        npm run start-node &
    fi
    sleep 10
done
