import dmsite.data_classifier.classifier as dc


def test_eq():
    c1 = dc.Classification('classification1')
    c2 = dc.Classification('classification1')
    c3 = dc.Classification('classification2')

    assert(c1 == c2)
    assert(c1 != c3)
