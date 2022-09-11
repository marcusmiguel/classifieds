/-  *classifieds
/+  gossip, default-agent, dbug
::
/$  grab-ad  %noun  %classifieds-advertisement
/$  grab-initial-ads  %noun  %classifieds-initial-ads
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
        [%classifieds-initial-ads |=(n=* !>((grab-initial-ads n)))]
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
        =/  ad  [our.bowl (sham eny.bowl) now.bowl forward.act title.act desc.act price.act images.act]
        :_  this(myads (weld myads ~[ad])) 
        :~  [(invent:gossip %classifieds-advertisement !>(ad))]
        ==
        ::
          %delete-ad
        ?>  =(our.bowl src.bowl)
        =/  exists  (find ~[id.act] (turn myads |=(=advertisement id.advertisement)))
        ?~  exists
          ~|((weld "No ad with id " (scow %uv id.act)) !!)
        =/  myads-new  (oust [u.exists 1] myads)
        :_  this(myads myads-new)
        [(invent:gossip %classifieds-initial-ads !>([now.bowl myads-new]))]~
        ::
          %toggle-favorite
        ?>  =(our.bowl src.bowl)
        =/  exists  (find ~[id.act] favorites)
        ?~  exists
          `this(favorites (weld favorites ~[id.act])) 
        `this(favorites (oust [u.exists 1] favorites))
        ::
          %send-message
        ?>  =(our.bowl src.bowl)
        ?>  (~(has in get-mutuals:hc) to.act)
        =/  new-msg   [ship=our.bowl date=now.bowl text=text.act]
        =/  index     (find ~[advertisement-id.act] (turn chats |=(=chat advertisement-id.chat)))
        ?:  =(index ~)
          =/  new-chats  (weld chats `(list chat)`~[[receiver=to.act advertisement-id=`@uvH`advertisement-id.act msgs=[new-msg ~]]])
          :_  this(chats new-chats)
          :~  [%pass /chat/(scot %p to.act)/(scot %uvh advertisement-id.act) %agent [to.act %classifieds] %poke %classifieds-action !>([%receive-message advertisement-id=`@uvH`advertisement-id.act msg=new-msg])]
              [%give %fact ~[/chats] %classifieds-chats !>(new-chats)]
          ==  
        =/  old-chat       (snag +.index chats)
        =/  modified-chat  [receiver=receiver.old-chat advertisement-id=advertisement-id.old-chat msgs=(weld msgs.old-chat ~[new-msg])]
        =/  new-chats  (snap chats +.index modified-chat)
        :_  this(chats new-chats)
        :~  [%pass /chat/(scot %p to.act)/(scot %uvh advertisement-id.act) %agent [to.act %classifieds] %poke %classifieds-action !>([%receive-message advertisement-id=`@uvH`advertisement-id.act msg=new-msg])]
            [%give %fact ~[/chats] %classifieds-chats !>(new-chats)]
        ==
        ::
          %receive-message
        ?>  (~(has in get-mutuals:hc) src.bowl)
        =/  index  (find ~[advertisement-id.act] (turn chats |=(=chat advertisement-id.chat)))
        ?:  =(index ~) 
          `this(chats (weld chats `(list chat)`~[[receiver=src.bowl advertisement-id=advertisement-id.act msgs=[msg.act ~]]]))
        =/  old-chat       (snag +.index chats)
        =/  modified-chat  [receiver=src.bowl advertisement-id=advertisement-id.old-chat msgs=(weld msgs.old-chat ~[msg.act])]
        `this(chats (snap chats +.index modified-chat))
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
      [%~.~ %gossip %source ~]
    ?>  (~(has in get-mutuals:hc) src.bowl)
    :_  this
    :~  [%give %fact ~ %classifieds-initial-ads !>([now.bowl myads])]
    ==
      [%chats ~]
    ?>  =(our.bowl src.bowl)
    :_  this
    :~  [%give %fact ~ %classifieds-chats !>(chats)]
    ==
  ==
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
  ?.  ?&  =(/~/gossip/gossip wire)
          ?=(%fact -.sign)
      ==
    (on-agent:def wire sign)
  ?+  p.cage.sign  (on-agent:def wire sign)
    %classifieds-initial-ads  :: will overwrite all the previous ads from that ship
      =/  newads  !<(initial-ads q.cage.sign)
      `this(ads (~(gas by ads) ~[[src.bowl +.newads]]), favorites (update-favorites:hc [+.newads favorites]), chats (update-chats:hc [+.newads chats]))
    %classifieds-advertisement :: will add the new ad to map
      =/  newad  !<(advertisement q.cage.sign)
      =/  newlist  (weld (~(got by ads) src.bowl) [newad ~])
      `this(ads (~(gas by ads) ~[[src.bowl newlist]]))
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
--
