/-  *classifieds 
=,  format
|% 
++  state
    |%  
    ++  to-json
        |=  s=state-0
        %-  pairs:enjs
        :~  ['ads' %a (turn `advertisements`(zing ~(val by ads:s)) parse-ad)]
            ['myads' %a (turn myads:s parse-ad)]
        ==
    ++  parse-ad
        |=  ad=advertisement
        %-  pairs:enjs  
        :~  [%publisher %s (scot %p publisher:ad)]
            [%date %s (scot %da date:ad)]
            [%title %s (crip title:ad)]
            [%desc %s (crip desc:ad)]
        ==
    --
++  action
    |% 
    ++  from-json
        |=  jon=json
        (client-action jon)
    ++  client-action
        %-  of:dejs
        :~  [%pub-advertisement parse-ad]
        ==
    ++  parse-ad
        %-  ot:dejs
        :~  [%title sa:dejs]
            [%desc sa:dejs]
        ==
    --
--
