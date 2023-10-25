import React, { FC } from "react";
import useTranslation from "next-translate/useTranslation";
import { AppBar, Button, Container, Grid, Modal, Link, Paper, Typography, Toolbar } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroller";

import { makeStyles } from '@material-ui/core/styles';

import { usePokemonList } from "../hooks/usePokemon";
import PokemonCard from "../components/PokemonCard";
import { typeColor } from '../constants/constants';

import { POKEMON_ALL, POKEMON_LOGO} from '../assets';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(12, 4, 12),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    containerContent: {
      padding: theme.spacing(8, 0, 6),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      backgroundColor: '#FFD700',
    },
    buttonCheck: {
      backgroundColor: '#DAA520',
    },
    modalContent: {
      marginTop: 140,
      width: 600,
      backgroundColor: "#FFFFFF",
      border: '2px solid #000',
      borderRadius: 10,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Index: FC = () => {
    const { t } = useTranslation();
    const ref = React.useRef(null);
    const classes = useStyles();
    const {
      isLoading,
      pokemon,
      nextPage,
      getPokemon,
    } = usePokemonList();

    const [open, setOpen] = React.useState(false);
    const [activeCard, setActiveCard] = React.useState({});

    const handleOpen = card => {
      setActiveCard(card);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const setToPokedex = () => {
      ref.current?.scrollIntoView({behavior: 'smooth'});
    };

    const modalBody = (
      <Container className={classes.modalContent}>
        <Grid container spacing={4} style={{ padding: 10 }}>
          <Grid md={4} style={{ padding: 5 }}>
            <Paper>
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${activeCard?.id}.png`}
                style={{ width: 160, background: 'transparent', alignSelf: 'center' }}
              />
            </Paper>
          </Grid>
          <Grid md={6} style={{ padding: 5 }}>
            <Typography variant="h6" align="left" color="textPrimary" paragraph style={{ fontWeight: 'bold' }}>
              {activeCard?.name}
            </Typography>
            <Grid container>
              <Grid sm={6}>
                <Typography variant="h7" align="left" color="textPrimary" paragraph>
                  Weight : {activeCard?.weight}
                </Typography>
              </Grid>
              <Grid sm={6}>
                <Typography variant="h7" align="left" color="textPrimary" paragraph>
                  Height : {activeCard?.height}
                </Typography>
              </Grid>
              <Grid container>
                <Grid sm={6}>
                  <Typography variant="h7" align="left" color="textPrimary" paragraph>
                    Abilities : 
                  </Typography>
                </Grid>
                <Grid sm={6}>
                  {activeCard?.abilities?.map((item, idx) => (
                    <Typography
                      key={`${idx}-ability`}
                      variant="h7"
                      align="left"
                      color="textPrimary"
                      paragraph
                    >
                      {`- ${item.ability.name} `} {item.ability.is_hidden && '( hidden )'} 
                    </Typography>
                  ))}
                </Grid>
              </Grid>
              <Grid container>
                <Grid sm={6}>
                  <Typography variant="h7" align="left" color="textPrimary" paragraph>
                    Type : 
                  </Typography>
                </Grid>
                <Grid container md={6}>
                  {activeCard?.types?.map(item => (
                    <Button
                      size="small"
                      key={item.type.name}
                      variant="contained"
                      style={{ backgroundColor: typeColor[item.type.name], margin: 2}}
                    >
                      {item.type.name}
                    </Button>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button onClick={handleClose} variant="contained" color="primary" className={classes.buttonCheck}>
          Close
        </Button>
      </Container>
    );

    return (
    <React.Fragment>
      <AppBar position="relative" style={{ backgroundColor: '#FFFFFF' }}>
        <Toolbar>
          <img src={POKEMON_LOGO.src} style={{ width: 120, background: 'transparent' }}/>
          <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Home
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Pokemon Type
            </Link>
        </nav>
        </Toolbar>
        <main>
        <div className={classes.heroContent}>
          <Container ref={ref}>
            <Grid container spacing={4}>
              <Grid md={6}>
                <Typography variant="h3" align="left" color="textPrimary" paragraph>
                  All the Pokemon data you'll ever need in one place!
                </Typography>
                <Typography variant="h6" align="left" color="textSecondary" paragraph>
                  Thousands of data compiled into one piece
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justifyContent="flex-start">
                    <Grid item>
                      <Button onClick={setToPokedex} variant="contained" color="primary" className={classes.buttonCheck}>
                        Check Pokedex
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Grid>

              <Grid md={6}>
                <img src={POKEMON_ALL.src} style={{maxWidth: 500}}/>
              </Grid>
            </Grid>
          </Container>
        </div>
        <Container className={classes.cardGrid}>
          <Typography variant="h5" align="center" color="textPrimary" paragraph>
            Pokedex
          </Typography>
          <Typography variant="h7" align="center" color="textSecondary" paragraph>
            All generation pokemon is here
          </Typography>
          {!isLoading && pokemon.length === 0 && (
              <div className="flex justify-center p-10">No Data </div>
          )}
          {!isLoading && pokemon.length > 0 && (
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={getPokemon}
              hasMore={Boolean(nextPage)}
              threshold={10}
            >
              <Grid container spacing={2}>
                {pokemon.map((data) => (
                  <PokemonCard key={data.name} data={data} onClick={() => handleOpen(data)} />
                ))}
              </Grid>
            </InfiniteScroll>
          )}
        </Container>
        </main>
        <Modal
          open={open}
          onClose={handleClose}
        >
          {modalBody}
        </Modal>
      </AppBar>
    </React.Fragment>
    );
};

export default Index;
