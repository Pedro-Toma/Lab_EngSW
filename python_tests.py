from python_CI_CD import *

def test_add():
    assert add(5,2) == 7
    assert add(2,0) == 2
    assert add(0,0) == 0
    assert add(2,-5) == -3
    assert add(-1,-2) == -3

def test_subt():
    assert subt(7,2) == 5
    assert subt(3,0) == 3
    assert subt(0,0) == 0
    assert subt(2,-1) == 3
    assert subt(-5,-11) == 6
    assert subt(-5,3) == -8

def test_mult():
    assert mult(2,3) == 6
    assert mult(2,1) == 2
    assert mult(5,0) == 0
    assert mult(2,-2) == -4
    assert mult(-2,-11) == 22

def test_div():
    assert div(6,2) == 3
    assert div(16,4) == 4
    assert div(5,1) == 5
    assert div(6,-2) == -3
