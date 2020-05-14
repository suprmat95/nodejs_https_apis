#!/bin/bash
echo 'Testing user creation APIs'
mocha test/api/user.test --exit
echo 'Testing login APIs'
mocha test/api/login.test --exit
echo 'Testing resource APIs'
mocha test/api/resource.test --exit
