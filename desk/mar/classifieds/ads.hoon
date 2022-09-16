/-  classifieds
/+  c=classifieds
|_  ads=(map ship (list advertisement:classifieds))
++  grab
  |%
  ++  noun  (map ship (list advertisement:classifieds))
  --
++  grow
  |%
  ++  noun  ads
  ++  json  (ads:to-json:c ads)
  --
++  grad  %noun
--