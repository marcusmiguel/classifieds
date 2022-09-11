/-  *classifieds
/+  gossip, default-agent, dbug
::
/$  grab-ad  %noun  %classifieds-advertisement
/$  grab-ad-catalog  %noun  %classifieds-ad-catalog
/$  grab-state  %noun  %classifieds-state
::
|%  
+$  versioned-state
  $%  state-0
  ==  
::   
+$  eyre-id  @ta
+$  card  card:agent:gall
--
::
=|  state-0
=*  state  -
%-  %+  agent:gossip
      [1 %mutuals %mutuals]
    %-  malt
    ^-  (list [mark $-(* vase)])
    :~  [%classifieds-advertisement |=(n=* !>((grab-ad n)))]
        [%classifieds-ad-catalog |=(n=* !>((grab-ad-catalog n)))]
        [%classifieds-state |=(n=* !>((grab-state n)))]
    ==
::
%-  agent:dbug
^-  agent:gall
=<
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %.n) bowl)
    hc    ~(. +> bowl)
::
++  on-init
  ^-  (quip card _this)
  :_  this
  [%pass /eyre/connect %arvo %e %connect [~ /[dap.bowl]] dap.bowl]~
::
++  on-save
  ^-  vase
  !>(state)
::
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  :: `this(state [%0 ads=*(map ship advertisements) myads=~ favs=~])
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %0  `this(state old)
  ==
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
    %classifieds-action
      =/  act  !<(action vase)
      ?-  -.act
        ::
          %publish-ad
        ?>  =(our.bowl src.bowl)
        =/  ad  
          :*
            ship=our.bowl
            id=(sham eny.bowl) 
            date=now.bowl 
            forward=forward.act 
            title=title.act 
            desc=desc.act 
            price=price.act 
            images=images.act
          ==
        =/  myads-new  (weld myads ~[ad])
        :_  this(myads myads-new) 
::        [(invent:gossip %classifieds-advertisement !>(ad))]~
        [(invent:gossip %classifieds-ad-catalog !>([our.bowl now.bowl myads-new]))]~
        ::
          %delete-ad
        ?>  =(our.bowl src.bowl)
        =/  exists  (find ~[id.act] (turn myads |=(=advertisement id.advertisement)))
        ?~  exists
          ~|((weld "No ad with id " (scow %uv id.act)) !!)
        =/  myads-new  (oust [u.exists 1] myads)
        :_  this(myads myads-new)
        [(invent:gossip %classifieds-ad-catalog !>([our.bowl now.bowl myads-new]))]~
        ::
          %toggle-favorite
        ?>  =(our.bowl src.bowl)
        =/  exists  (find ~[id.act] favorites)
        ?~  exists
          `this(favorites (weld favorites ~[id.act])) 
        `this(favorites (oust [u.exists 1] favorites))
      ==
  ==
::
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  ?+  sign-arvo  (on-arvo:def wire sign-arvo)
      [%eyre %bound *]
    ~?  !accepted.sign-arvo
      [dap.bowl 'eyre bind rejected!' binding.sign-arvo]
    [~ this]
  ==
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?:  ?=([%http-response *] path)  [~ this]
  ?.  =(/~/gossip/source path)
    (on-watch:def path)
  :_  this
  [%give %fact ~ %classifieds-ad-catalog !>([publisher=our.bowl timestamp=now.bowl ads=myads])]~
::
++  on-peek 
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  (on-peek:def path)
    [%x %state ~]  ``classifieds-state+!>(state)
    [%x %favorites ~]  ``noun+!>(favorites)
    [%x %our-ads ~]  ``classifieds-advertisements+!>(myads)
  ==
::
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?.  ?&  =(/~/gossip/gossip wire)
          ?=(%fact -.sign)
      ==
    (on-agent:def wire sign)
  ?+  p.cage.sign  (on-agent:def wire sign)
    %classifieds-ad-catalog  :: will overwrite all the previous ads from that ship
      =/  catalog  !<(ad-catalog q.cage.sign)
      ?:  =(publisher.catalog our.bowl)  (on-agent:def wire sign)
      =/  ads-new  (~(gas by ads) [publisher.catalog ads.catalog]~)
      =/  favs-new  (update-favorites:hc [ads.catalog favorites])
      :_  this(ads ads-new, favorites favs-new)
      ?.  =(publisher.catalog src.bowl)
      :: TODO: check if src.bowl of a forward is a %pals mutal. If yes, ignore the
      :: incoming catalog
      ::
        ~
      =/  forwards  ^-  (list advertisement)  
          (skim ads.catalog |=(ad=advertisement forward.ad))
      =/  forward-catalog  catalog(ads forwards) 
      [(invent:gossip %classifieds-ad-catalog !>(forward-catalog))]~
::
::    %classifieds-advertisement :: will add the new ad to map
::      =/  newad  !<(advertisement q.cage.sign)
::      =/  newlist  (weld (~(got by ads) src.bowl) [newad ~])
::      `this(ads (~(gas by ads) ~[[src.bowl newlist]]))
  ==
::  
++  on-fail   on-fail:def
++  on-leave  on-leave:def
--
|_  bowl=bowl:gall
++  update-favorites
  |=  [ads=(list advertisement) favs=(list favorite)]
  ^-  (list favorite)
  =/  newfavs  ~
  =/  ids  (get-ids ads)
  |-
  ?~  favs
    newfavs
  =/  fav  `favorite`-.favs
  =/  exists  (find ~[fav] ids)
  ?~  exists
    $(favs +.favs)
  [fav $(favs +.favs)]
++  get-ids
  |=  ads=(list advertisement)
  ^-  (list @uvH)
  |-  
  ?~  ads
    ~
  =/  ad  `advertisement`-.ads
  [`@uvH`id.ad $(ads +.ads)]
--
