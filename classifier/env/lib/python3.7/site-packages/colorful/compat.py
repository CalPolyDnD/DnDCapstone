# -*- coding: utf-8 -*-

"""
    colorful
    ~~~~~~~~

    Terminal string styling done right, in Python.

    :copyright: (c) 2017 by Timo Furrer <tuxtimo@gmail.com>
    :license: MIT, see LICENSE for more details.
"""

from __future__ import unicode_literals

import sys


#: Holds a flag whether Python 2 is used or not
PY2 = sys.version_info.major == 2

if PY2:
    string_types = (str, unicode)
else:
    string_types = (str,)
