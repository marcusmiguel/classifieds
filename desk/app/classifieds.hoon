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
      [2 %mutuals %mutuals]
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
  :: `this(state [%0 ads=*(map ship (list advertisement)) myads=*(list advertisement) favorites=*(list favorite) chats=*(list chat)])
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
        =/  errors  (validate-ad:hc ad)
        ?.  =(errors ~)  ~|((weld "Error(s) validating ad:" `tape`errors) !!)
        =/  myads-new  (weld myads ~[ad])
        :_  this(myads myads-new) 
        :~  [(invent:gossip %classifieds-ad-catalog !>([our.bowl now.bowl myads-new]))]
            [%give %fact ~[/myads] %classifieds-myads !>(myads-new)]
        ==
        ::
          %delete-ad
        ?>  =(our.bowl src.bowl)
        =/  exists  (find ~[id.act] (turn myads |=(=advertisement id.advertisement)))
        ?~  exists
          ~|((weld "No ad with id " (scow %uv id.act)) !!)
        =/  myads-new    (oust [u.exists 1] myads)
        =/  ads-to-list  (weld `(list advertisement)`(zing ~(val by ads)) `(list advertisement)`myads-new)
        =/  chats-new    (update-chats:hc [(weld myads-new `(list advertisement)`ads-to-list) chats]) 
        :- 
          :~  [(invent:gossip %classifieds-ad-catalog !>([our.bowl now.bowl myads-new]))]
              [%give %fact ~[/myads] %classifieds-myads !>(myads-new)]
              [%give %fact ~[/chats] %classifieds-chats !>(chats-new)]
          ==
        %=  this 
          myads      myads-new 
          chats      chats-new
        ==
        ::
          %edit-ad
        ?>  =(our.bowl src.bowl)
        =/  local-ind  (need (find ~[id.act] (turn myads |=(=advertisement id.advertisement))))
        =/  ad-old  (snag local-ind myads)
        =/  ad-new 
        %_  ad-old 
          forward  (fall forward.act forward.ad-old)
          title    (fall title.act title.ad-old)
          desc     (fall desc.act desc.ad-old)
          price    (fall price.act price.ad-old)
          images   (fall images.act images.ad-old)
        ==
        =/  myads-new  (snap myads local-ind ad-new)
        :-  
          :~  [(invent:gossip %classifieds-ad-catalog !>([our.bowl now.bowl myads-new]))]
              [%give %fact ~[/myads] %classifieds-myads !>(myads-new)]
              [%give %fact ~[/chats] %classifieds-chats !>(chats)]
          ==
          this(myads myads-new)
        ::
          %toggle-favorite
        ?>  =(our.bowl src.bowl)
        =/  exists  (find ~[id.act] favorites)
        ?~  exists
          =/  favs-new  (weld favorites ~[id.act])
          :-  [%give %fact ~[/favorites] %classifieds-favorites !>(favs-new)]~
          this(favorites favs-new) 
        =/  favs-new  (oust [u.exists 1] favorites)
        :-  [%give %fact ~[/favorites] %classifieds-favorites !>(favs-new)]~
        this(favorites favs-new)
        ::
          %send-message
        ?>  =(our.bowl src.bowl)
        =/  msg-new   [ship=our.bowl date=now.bowl text=text.act]
        =/  index     (find ~[advertisement-id.act] (turn chats |=(=chat advertisement-id.chat)))
        ?:  =(index ~)
          =/  chats-new  (weld chats `(list chat)`~[[receiver=to.act advertisement-id=`ad-id`advertisement-id.act msgs=[msg-new ~]]])
          :_  this(chats chats-new)
          :~  [%pass /chat/(scot %p to.act)/(scot %uv advertisement-id.act) %agent [to.act %classifieds] %poke %classifieds-action !>([%receive-message advertisement-id=`ad-id`advertisement-id.act msg=msg-new])]
              [%give %fact ~[/chats] %classifieds-chats !>(chats-new)]
          ==  
        =/  old-chat       (snag +.index chats)
        =/  modified-chat  [receiver=receiver.old-chat advertisement-id=advertisement-id.old-chat msgs=(weld msgs.old-chat ~[msg-new])]
        =/  chats-new      (snap chats +.index modified-chat)
        :_  this(chats chats-new)
        :~  [%pass /chat/(scot %p to.act)/(scot %uv advertisement-id.act) %agent [to.act %classifieds] %poke %classifieds-action !>([%receive-message advertisement-id=`ad-id`advertisement-id.act msg=msg-new])]
            [%give %fact ~[/chats] %classifieds-chats !>(chats-new)]
        ==
        ::
          %receive-message
        =/  index  (find ~[advertisement-id.act] (turn chats |=(=chat advertisement-id.chat)))
        ?:  =(index ~) 
          `this(chats (weld chats `(list chat)`~[[receiver=src.bowl advertisement-id=advertisement-id.act msgs=[msg.act ~]]]))
        =/  old-chat       (snag +.index chats)
        =/  modified-chat  [receiver=src.bowl advertisement-id=advertisement-id.old-chat msgs=(weld msgs.old-chat ~[msg.act])]
        =/  new-chats      (snap chats +.index modified-chat)
        :_  this(chats new-chats)
        :~  [%give %fact ~[/chats] %classifieds-chats !>(new-chats)]
        ==
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
  ?+    path  (on-watch:def path)
    ::
        [%~.~ %gossip %source ~]
      :_  this
      :~  [%give %fact ~ %classifieds-ad-catalog !>([publisher=our.bowl timestamp=now.bowl ads=myads])]
      ==
    ::
        [%chats ~]
      ?>  =(our.bowl src.bowl)
      :_  this
      :~  [%give %fact ~ %classifieds-chats !>(chats)]
      ==
    ::
        [%ads ~]
      ?>  =(our.bowl src.bowl)
      :_  this
      :~  [%give %fact ~ %classifieds-ads !>(ads)]
      ==
    ::
        [%myads ~]
      ?>  =(our.bowl src.bowl)
      :_  this
      :~  [%give %fact ~ %classifieds-myads !>(myads)]
      ==
    :: 
        [%favorites ~]
      ?>  =(our.bowl src.bowl)
      :_  this
      :~  [%give %fact ~ %classifieds-favorites !>(favorites)]
      ==
    ::
  ==
::
++  on-peek 
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  (on-peek:def path)
    [%x %state ~]      ``classifieds-state+!>(state)
    [%x %favorites ~]  ``classifieds-favorites+!>(favorites)
    [%x %myads ~]      ``classifieds-myads+!>(myads)
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
      =/  ads-new  (~(gas by ads) [publisher.catalog ads.catalog]~)
      =/  ads-new-list  `(list advertisement)`(zing ~(val by ads-new))
      =/  favs-new  (update-favorites:hc [ads.catalog favorites])
      =/  chats-new  (update-chats:hc [(weld myads ads-new-list) chats])
      :-  
        :~  [%give %fact ~[/favorites] %classifieds-favorites !>(favs-new)]
            [%give %fact ~[/chats] %classifieds-chats !>(chats-new)]
            [%give %fact ~[/ads] %classifieds-ads !>(ads-new)]
        ==
        this(ads ads-new, favorites favs-new, chats chats-new)
::      :_  this(ads ads-new, favorites favs-new, chats chats-new)
::      ?.  =(publisher.catalog src.bowl)
::      :: TODO: check if src.bowl of a forward is a %pals mutal. If yes, ignore the
::      :: incoming catalog
::      ::
::        ~
::      =/  forwards  ^-  (list advertisement)  
::          (skim ads.catalog |=(ad=advertisement forward.ad))
::      =/  forward-catalog  catalog(ads forwards) 
::      [(invent:gossip %classifieds-ad-catalog !>(forward-catalog))]~
    ::
::    %classifieds-advertisement   ::  will add the new ad to map
::      =/  newad    !<(advertisement q.cage.sign)
::      =/  newlist  (weld (~(got by ads) src.bowl) [newad ~])
::      :-  ~
::      %=  this  
::        ads     (~(gas by ads) ~[[src.bowl newlist]])
::      ==  
::    ::
  ==
::  
++  on-fail   on-fail:def
++  on-leave  on-leave:def
--
|_  bowl=bowl:gall
::
::  remove favorites that doesn't have corresponding ads anymore
::
++  update-favorites
  |=  [ads=(list advertisement) favs=(list favorite)]
  ^-  (list favorite)
  =/  ids  (turn ads |=(=advertisement id.advertisement))
  |-
  ?~  favs
    ~
  =/  fav  `favorite`-.favs
  =/  exists  (find ~[fav] ids)
  ?~  exists
    $(favs +.favs)
  [fav $(favs +.favs)]
::
::  remove chats that doesn't have corresponding ads anymore
::
++  update-chats
  |=  [ads=(list advertisement) chats=(list chat)]
  ^-  (list chat)
  =/  ids  (turn ads |=(=advertisement id.advertisement))
  |-
  ?~  chats
    ~
  =/  chat  `chat`-.chats
  =/  exists  (find ~[advertisement-id.chat] ids)
  ?~  exists
    $(chats +.chats)
  [chat $(chats +.chats)]
::
::  returns mutuals from %pals
::
++  get-mutuals
  .^((set ship) %gx /(scot %p our.bowl)/pals/(scot %da now.bowl)/mutuals/noun)
++  validate-ad
  |=  ad=advertisement
  ^-  tape
  =/  title-error   (validate-title title.ad)  
  =/  desc-error    (validate-desc desc.ad) 
  =/  images-error  (validate-images images.ad)
  =/  price-error   (validate-price price.ad)
  ;:(weld title-error desc-error images-error price-error)
++  validate-title
  |=  title=tape
  ^-  tape
  ?:  ?|  =((lent title) 0)
          (gth (lent title) 100)
      ==
    " Title cannot be blank nor exceed 100 characters;"
  ~
++  validate-desc
  |=  desc=tape
  ^-  tape  
  ?:  (gth (lent desc) 1.000)
    " Description cannot exceed 1000 characters;"
  ~
++  validate-images
  |=  images=(list @t)
  ^-  tape
  ?:  (gth (lent images) 20)
    " Maximum of twenty images allowed;"
  ~
++  validate-price
  |=  price=tape
  ^-  tape
  ?:  (gth (lent price) 12)
    " Price cannot exceed 12 digits;"
  ~
--
